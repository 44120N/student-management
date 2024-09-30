@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Student Details</h1>

    <div class="card">
        <div class="card-header">
            <h2>{{ $student->name }}</h2>
        </div>
        <div class="card-body">
            <p><strong>NRP:</strong> {{ $student->nrp }}</p>
            <p><strong>Email:</strong> {{ $student->email }}</p>
            <p><strong>Address:</strong> {{ $student->address }}</p>
            <p><strong>Birthdate:</strong> {{ $student->birthdate }}</p>
        </div>
        <div class="card-footer">
            <a href="{{ route('students.index') }}" class="btn btn-secondary">Back to Students List</a>
            <a href="{{ route('students.edit', $student->nrp) }}" class="btn btn-primary">Edit Student</a>
        </div>
    </div>
</div>
@endsection
