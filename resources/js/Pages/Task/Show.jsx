import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/lib/Constants';
import { Head } from '@inertiajs/react'
import React from 'react'
import TasksTable from '../Task/TasksTable';

function Show({task, tasks, queryParams=null}) {
  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                {task.name}
            </h2>
        }
    >
        <Head title={ `Task: ${task.name}` } />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div>
                <img
                    src={task.image_path}
                    style={{height: '465px'}}
                    alt=""
                    className="w-full h-64 object-cover"
                />
                </div>
                <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="grid gap-1 grid-cols-2 mt-2">
                    <div>
                    <div>
                        <label className="font-bold text-lg">Task ID</label>
                        <p className="mt-1">{task.id}</p>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Task Name</label>
                        <p className="mt-1">{task.name}</p>
                    </div>

                    <div className="mt-4">
                        <label className="font-bold text-lg">Project Name</label>
                        <p className="mt-1">{task.project.name}</p>
                    </div>

                    <div className="mt-4">
                        <label className="font-bold text-lg">Task Status</label>
                        <p className="mt-1">
                        <span
                            className={
                            "px-2 py-1 rounded text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                            }
                        >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                        </p>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Created By</label>
                        <p className="mt-1">{task.createdBy.name}</p>
                    </div>
                    </div>
                    <div>
                    <div>
                        <label className="font-bold text-lg">Due Date</label>
                        <p className="mt-1">{task.due_date}</p>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Create Date</label>
                        <p className="mt-1">{task.created_at}</p>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Updated By</label>
                        <p className="mt-1">{task.updatedBy.name}</p>
                    </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="font-bold text-lg">Task Description</label>
                    <p className="mt-1">{task.description}</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <TasksTable queryParams={queryParams} hidePorjectColumn={true} routeName="task.show" routeParams={{ task: task.id }} tasks={tasks}/>
                    </div>
                </div>
            </div>
        </div> */}

    </AuthenticatedLayout>
  )
}

export default Show