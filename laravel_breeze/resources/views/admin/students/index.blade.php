@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Students List</h1>
    
    @if (session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    
    <!-- Search Form -->
    <form action="{{ route('students.index') }}" method="GET" class="mb-4">
        <div class="input-group">
            <input type="text" name="search" class="form-control" placeholder="Search by NRP, Email, or Name" value="{{ request()->get('search') }}">
            <button class="btn btn-primary" type="submit">Search</button>
        </div>
    </form>
    <a href="{{ route('students.create') }}" class="btn btn-primary mb-3">Create New Student</a>
    
    <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>NRP</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($students as $student)
                    <tr>
                        <td>{{ $student->nrp }}</td>
                        <td>{{ $student->name }}</td>
                        <td>{{ $student->email }}</td>
                        <td>
                            <a href="{{ route('students.show', $student->nrp) }}" class="btn btn-info btn-sm">View</a>
                            <a href="{{ route('students.edit', $student->nrp) }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="{{ route('students.destroy', $student->nrp) }}" method="POST" style="display:inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    {{ $students->links() }}
</div>
@endsection
