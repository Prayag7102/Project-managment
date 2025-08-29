import React from 'react'
import TableHeading from '@/Components/TableHeading';
import { Edit, Trash2 } from "lucide-react";
import Pagination from '@/Components/Pagination';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/lib/Constants.jsx';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';

function TasksTable({tasks, queryParams,routeName,routeParams={}}) {

     queryParams = queryParams || {};
    
        const serachField = (name, value) => {
            if(value){
                queryParams[name] = value;
            } else{
                delete queryParams[name];
            }
    
            router.get(route('task.index',routeParams || {}, queryParams));
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
            router.get(
                route(routeName, { ...routeParams, ...queryParams }),
                {},
                { preserveScroll: true, preserveState: true }
            );
        }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;
        
        serachField(name, e.target.value);
    }
    return (
        <div className='overflow-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                    <tr className='text-nowrap'>
                        <TableHeading sortChanged={sortChanged} name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} />
                        <th className='px-3 py-2'>Image</th>
                        <TableHeading sortChanged={sortChanged} name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} />
                        <th className='px-3 py-2'>Status</th>
                        <th className='px-3 py-2'>Create date</th>
                        <th className='px-3 py-2'>Due Date</th>
                        <th className='px-3 py-2'>Created By</th>
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
                                placeholder='Task Name'
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
                        tasks.data.map((task) => (
                            <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <th className='px-3 py-2'>{task.id}</th>
                                <td className='px-3 py-2'><img src={task.image_path} /></td>
                                <td className='px-3 py-2'>{task.name}</td>
                                <td className='px-3 py-2'>
                                    <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
                                <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                                <td className='px-3 py-2'>{task.createdBy.name}</td>
                                <td className='px-3 py-2'>
                                    <div className='flex items-center gap-3'>
                                        <Link
                                            href={`/task/${task.id}/edit `}
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
            <Pagination links={tasks.meta.links} />
        </div>
    )
}

export default TasksTable