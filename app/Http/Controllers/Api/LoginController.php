<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
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
            'email'     => 'required',
            'password'  => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json(['hasil' => '1', 'message' => $validator->errors()], 200);
        }

        //get credentials from request
        $credentials = $request->only('email', 'password');

        //if auth failed
        if(!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['hasil' => '2', 'message' => 'Email atau Password Anda salah'], 200);
        }

        if (auth()->user()->usergroup != 1) {
            return response()->json(['hasil' => '4'], 200);
        }else{
            return response()->json(['hasil' => '3','user'    => auth()->user(), 'token' => $token], 200);
        }
    }
}
