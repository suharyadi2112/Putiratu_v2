<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usergroups extends Model
{	
	protected $table = 'usergroup';
	protected $primaryKey = 'id';
    protected $fillable = [
        'name', 'keterangan'
    ];
}
