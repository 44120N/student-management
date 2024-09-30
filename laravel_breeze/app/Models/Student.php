<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'nrp';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nrp',
        'name',
        'address',
        'email',
        'birthdate',
    ];
}
