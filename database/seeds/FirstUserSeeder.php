<?php

use Illuminate\Database\Seeder;

class FirstUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin')
        ]);
        $role = \Spatie\Permission\Models\Role::create(['name' => 'admin']);

        $user->assignRole($role);
    }
}
