<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')){
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia('Task/Index', ['tasks' => TaskResource::collection($tasks),'queryParams' => request()->query()?: null]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if($image){
            $data['image_path'] = $image->store('tasks/'.Str::random(),'public');
        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Task::create($data);

        return redirect()->route('task.index')
        ->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = Task::query();

        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if(request('status')){
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia('Task/Show',[
            'task' => new TaskResource($task),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query()?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit',['task' => new TaskResource($task)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if($image){
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('tasks/'.Str::random(),'public');
        }
        $data['updated_by'] = Auth::id();
        $task->update($data);
        return redirect()->route('task.index')
        ->with('success', 'Task "' . $task->name . '" updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
        return redirect()->route('task.index')
        ->with('success', 'Task "' . $name . '" deleted successfully');
    }
}
