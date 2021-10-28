import React from 'react'

function Dashboard() {
    let c=localStorage.getItem('user')
    c=JSON.parse(c)
    if(c){
    return (
        <div>
          <h1>{c.name}</h1>
          <h1>{c.email}</h1>
        </div>
    )
}
else{
    return (
        <div>
          You need to Login first
        </div>
    )  
}
}

export default Dashboard

