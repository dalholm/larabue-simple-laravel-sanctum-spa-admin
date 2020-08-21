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
            'email' => 'admins@admin.com',
            'password' => bcrypt('admin')
        ]);
        $role = \Spatie\Permission\Models\Role::create(['name' => 'bubbe']);

        $user->assignRole('bubbe');
    }
}
