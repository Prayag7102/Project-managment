import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import {  ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/lib/Constants.jsx';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';

function index({ projects, queryParams = null }) {

    queryParams = queryParams || {};

    const serachField = (name, value) => {
        if(value){
            queryParams[name] = value;
        } else{
            delete queryParams[name];
        }

        router.get(route('project.index', queryParams));
    }

    const sortChanged = (name, e) => {
            if(name === queryParams.sort_field){
                if(queryParams.sort_direction === 'asc'){
                    queryParams.sort_direction = 'desc';
                } else{
                    queryParams.sort_direction = 'asc';
                }
            } else{
                queryParams.sort_field = name;
                queryParams.sort_direction = 'asc';
            }
    
            router.get(route('project.index', queryParams));
        }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;
        
        serachField(name, e.target.value);
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <TableHeading name="id" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}/>
                                        <th onClick={(e)=> sortChanged('image', e)} className='px-3 py-2'>Image</th>
                                        <TableHeading name="name" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}/>
                                        <th onClick={(e)=> sortChanged('status', e)} className='px-3 py-2'>Status</th>
                                        <th onClick={(e)=> sortChanged('created_at', e)} className='px-3 py-2'>Create date</th>
                                        <th onClick={(e)=> sortChanged('due_date', e)} className='px-3 py-2'>Due Date</th>
                                        <th onClick={(e)=> sortChanged('created_by', e)} className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2 text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full'
                                            defaultValue={queryParams?.name}
                                               placeholder='Project Name'
                                               onBlur={(e) => serachField('name', e.target.value)}
                                               onKeyPress={(e) => onKeyPress('name', e.target.value)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'>
                                            <SelectInput className='w-full' onChange={(e) => serachField('status', e.target.value)} defaultValue={queryParams?.status}>
                                                <option value="">Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2 text-center'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projects.data.map((project) => (
                                            <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                <th className='px-3 py-2'>{project.id}</th>
                                                <td className='px-3 py-2'><img src={project.image_path}/></td>
                                                <td className='px-3 py-2 cursor-pointer hover:text-blue-600 hover'>
                                                    <Link href={(route('project.show', project.id))}>{project.name}</Link>
                                                </td>
                                                <td className='px-3 py-2'>
                                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2 text-nowrap'>{project.created_at}</td>
                                                <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                                <td className='px-3 py-2'>{project.createdBy.name}</td>
                                                <td className='px-3 py-2'>
                                                    <div className='flex items-center gap-3'>
                                                        <Link
                                                            href={`/project/${project.id}/edit `}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white
                                                             hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                                        >
                                                            <Edit size={18} />
                                                            <span>Edit</span>
                                                        </Link>

                                                        <button
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 text-white 
                                                            hover:bg-red-700 transition-colors duration-200 shadow-md"
                                                        >
                                                            <Trash2 size={18} />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default index