"use client"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function ProfilePage() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl border-[#f5deb3] shadow-sm bg-[#0c1117] text-[#f5deb3]">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-[#f5deb3]">
        User Profile
      </h2>

      {user ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[#f5deb3]/80">Name:</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#f5deb3]/80">Email:</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#f5deb3]/80">User ID:</p>
            <p className="text-lg font-semibold">{user.id}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm italic text-red-400">User not logged in</p>
      )}
      <Button 
  className="mt-6 w-full border border-[#f5deb3] text-[#f5deb3] hover:bg-[#f5deb3] hover:text-[#0c1117] transition cursor-pointer">
  LOG OUT
</Button>
    </div>
  )
}
