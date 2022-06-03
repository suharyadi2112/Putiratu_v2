<?php

namespace App\Http\Controllers\Api\Usergroup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//model usergroup
use App\Usergroups;

class UsergroupController extends Controller
{
    public function GetUsergroup(){

    	$Usergroup = Usergroups::all();
    	if ($Usergroup) {
    		return response()->json(['kode' => '1', 'isi' => $Usergroup], 200);
    	}else{
    		return response()->json(['kode' => '2'], 200);
    	}

    }
}
