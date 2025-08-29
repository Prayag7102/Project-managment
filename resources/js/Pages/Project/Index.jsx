import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Edit, Trash2 } from "lucide-react";
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/lib/Constants.jsx';

function index({ projects }) {
    console.log(projects);
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
                                        <th className='px-3 py-2'>ID</th>
                                        <th className='px-3 py-2'>Image</th>
                                        <th className='px-3 py-2'>Name</th>
                                        <th className='px-3 py-2'>Status</th>
                                        <th className='px-3 py-2'>Create date</th>
                                        <th className='px-3 py-2'>Due Date</th>
                                        <th className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2 text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projects.data.map((project) => (
                                            <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                <th className='px-3 py-2'>{project.id}</th>
                                                <td className='px-3 py-2'><img src={project.image_path}/></td>
                                                <td className='px-3 py-2'>{project.name}</td>
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