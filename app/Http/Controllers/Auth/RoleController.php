<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of roles from current logged user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return auth()->user()->getRoleNames();
    }

    public function all(Request $request)
    {
        return Role::all();
    }

    public function search(Request $request)
    {
        $search = $request->get('search');

        $models = Role::where('id', 'LIKE', "{$search}%")
            ->orWhere('name', 'LIKE', "%{$search}%");

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

    public function put(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        return Role::create($request->all());
    }

    public function patch(Request $request)
    {
        $role = Role::where('id', $request->get('id'))->firstOrFail();
        $request->validate([
            'name' => 'required'
        ]);

        return $role->update($request->all());
    }

    public function delete(Request $request, $role_id)
    {
        $role = Role::where('id', $role_id)->firstOrFail();
        $role->delete();
    }
}
