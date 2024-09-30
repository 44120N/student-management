@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Create New Student</h2>

    <form action="{{ route('students.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="nrp">NRP</label>
            <input type="text" name="nrp" class="form-control" value="{{ old('nrp') }}" required>
        </div>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control" value="{{ old('name') }}" required>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" value="{{ old('email') }}" required>
        </div>

        <div class="form-group">
            <label for="address">Address</label>
            <textarea name="address" class="form-control">{{ old('address') }}</textarea>
        </div>

        <div class="form-group">
            <label for="birthdate">Birthdate</label>
            <input type="date" name="birthdate" class="form-control" value="{{ old('birthdate') }}" required>
        </div>

        
        <div class="d-flex justify-content-evenly mt-3">
            <button type="submit" class="btn btn-success">Save</button>
            <a href="{{ route('students.index') }}" class="btn btn-secondary">Back to Students List</a>
        </div>
    </form>
</div>
@endsection
