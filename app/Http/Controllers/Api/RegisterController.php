<?php

namespace App\Http\Controllers\Api;

use App\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
 
class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        //set validation
        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6|confirmed'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json(['kode' => '1', 'pesan' => $validator->errors()], 200);
        }

        //create user
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password)
        ]);

        //return response JSON user is created
        if($user) {
            return response()->json(['kode' => '2','pesan' => 'Success insert new user data'], 200);
        }else{
            return response()->json(['kode' => '3', 'pesan' => 'Failed insert user data'], 200);
        }
    }
}
