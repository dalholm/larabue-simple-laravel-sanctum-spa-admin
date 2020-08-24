<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Notifications\NewUserNotification;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function get()
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();
        $user->load('roles')->pluck('name');
        return $user;
    }

    public function patch(UserRequest $request)
    {
        return tap(User::findOrFail(auth()->user()->id))
            ->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);
    }

    public function put(UserRequest $request)
    {
        $password = Str::random(8);
        $user = User::create([
            'password' => bcrypt($password)
            ] + $request->all());


        $user->syncRoles($request->get('userRoles'));

        $user->notify(new NewUserNotification($password));
        return $user;
    }

    public function update(UserRequest $request)
    {
        $user = User::findOrFail($request->input('id'));

        $user
            ->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

        $user->syncRoles($request->get('userRoles'));
        return response()->json('', 204);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    public function password(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        User::findOrFail(auth()->user()->id)
            ->update([
                'password' => Hash::make($request->password)
            ]);

        return response('',201);
    }

    public function search(Request $request)
    {
        $search = $request->get('search');
        $models = User::where('id', 'LIKE', "{$search}%")
            ->orWhere('name', 'LIKE', "%{$search}%")
            ->orWhere('email', 'LIKE', "{$search}%");

        if ($request->get('sort')) {
            $sort = (object) $request->get('sort');
            $models->orderBy($sort->field, $sort->order);
        } else {
            $models->orderBy('id', 'desc');
        }
        $per_page = 25;
        if ($request->get('per_page')) {
            $per_page = $request->get('per_page');
        }

        return $models->paginate($per_page);

    }

    public function delete(Request $request, $user_id)
    {
        $user = User::findOrFail($user_id);
        if ($user->id == Auth::id()) {
            abort(500, 'Error, trying deleting your self');
        }

        return $user->delete();
    }
}
