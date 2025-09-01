import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { Edit, Trash2 } from "lucide-react";
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { toast } from 'react-toastify';

function index({ users, queryParams = null, success }) {

    queryParams = queryParams || {};

    const serachField = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('user.index', queryParams));
    }

    const sortChanged = (name, e) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('user.index', queryParams));
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        serachField(name, e.target.value);
    }

    const handleDetele = (user) => {
        if (!confirm("Are you sure want to delete this record?")) {
            return;
        }
        router.delete(route('user.destroy', user.id));
    }
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            {
                success && (
                    toast.success(success)
                )
            }

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <TableHeading name="id" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} />
                                        <TableHeading name="name" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} />
                                        <th onClick={(e) => sortChanged('email', e)} className='px-3 py-2'>Email</th>
                                        <th onClick={(e) => sortChanged('created_at', e)} className='px-3 py-2'>Create date</th>
                                        <th className='px-3 py-2 text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full'
                                                defaultValue={queryParams?.name}
                                                placeholder='User Name'
                                                onBlur={(e) => serachField('name', e.target.value)}
                                                onKeyPress={(e) => onKeyPress('name', e.target.value)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full'
                                                defaultValue={queryParams?.email}
                                                placeholder='User Email'
                                                onBlur={(e) => serachField('email', e.target.value)}
                                                onKeyPress={(e) => onKeyPress('email', e.target.value)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2 text-center'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.data.map((user) => (
                                            <tr key={user.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                <th className='px-3 py-2'>{user.id}</th>
                                                <td className='px-3 py-2 cursor-pointer hover:text-blue-600 hover'>
                                                    <Link href={(route('user.show', user.id))}>{user.name}</Link>
                                                </td>
                                                <td className='px-3 py-2'>
                                                    <span className={`px-2 py-1 rounded text-black`}>
                                                        {user.email}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2 text-nowrap'>{user.created_at}</td>
                                                <td className='px-3 py-2'>
                                                    <div className='flex items-center gap-3'>
                                                        <Link
                                                            href={`/user/${user.id}/edit `}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white
                                                             hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                                        >
                                                            <Edit size={18} />
                                                            <span>Edit</span>
                                                        </Link>

                                                        <button
                                                            onClick={(e) =>  handleDetele(user)}
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
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default index