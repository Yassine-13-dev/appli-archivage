import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>
        <h1>Navbar Dashboard</h1>
      </nav>
      <section>{children}</section>
    </div>
  )
}
