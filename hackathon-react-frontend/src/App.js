import {React,useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import {
   BrowserRouter as Router, 
   Route,
   Link ,
   useParams,
   useHistory,
   
   Switch
  } from "react-router-dom";

  const myContext ={
    "theater" : "text",
    "movie"   :"master",
    "seats" : 100,
    "date":"",
    "time":""
  }

const Bookticket = ()=>{
  
  console.log(myContext);
  const bookTicket = async()=>{
    let seats = document.getElementById('seats').value
    if(seats<=myContext.seats){
      let s = myContext.seats;
      myContext.seats= myContext.seats-seats;
      document.getElementById('avseats').value=myContext.seats
      let data = {
        "name":myContext.theater,
        "movie":myContext.movie,
        "seats":seats,
        "bseats":s,
        "date":myContext.date,
        "time":myContext.time,
        "customer":document.getElementById('name').value,
        "phone":document.getElementById('phone').value,
        "mail":document.getElementById('email').value
      }

      console.log(data);

      let res = await fetch("https://movie-bookingbackend.herokuapp.com/book",{
        method:"POST",
        body: JSON.stringify(data),
        headers:{"Content-Type":"application/json"}
      })

      let k = await res.json();

      alert(k.message);


    }
    else{
      alert('please enter lessthan available seats')
    }
  }

  return(
    <div>
    <div className="row" style={{"marginTop":"20px"}}>
      <div className="col-6" >
      <input className="form-control" type="text" placeholder={myContext.theater} readOnly />
      </div>
      <div className="col-6" >
      <input className="form-control" type="text" placeholder={myContext.movie} readOnly />
      </div>

    </div>

    <div className="row" style={{"marginTop":"20px"}}>
      <div className="col-4" >
      <lable>Available seats: <input className="form-control" id="avseats" type="text" placeholder={myContext.seats} readOnly /></lable>
      </div>
      <div className="col-4" >
      <lable>showTime: <input className="form-control" type="text" placeholder={myContext.time} readOnly /></lable>
      <div className="col-4" >
      <lable>Date: <input className="form-control" type="text" placeholder={myContext.date} readOnly /></lable>
      </div>
      </div>

    </div>
      <div className="row" style={{"marginTop":"20px"}}>
        <div className="col-6">
          <div className="form-group">
              <label for="seats">Enter Seats</label>
              <input type="text" className="form-control" id="seats"  placeholder="Enter seats" />
          </div>
      </div>
      <div className="col-6">
          <div className="form-group">
              <label for="name">Enter name</label>
              <input type="text" className="form-control" id="name"  placeholder="Enter name" />
          </div>
      </div>

      <div className="col-6">
          <div className="form-group">
              <label for="phone">Enter Phone Number</label>
              <input type="phone" className="form-control" id="phone"  placeholder="Enter phone no" />
          </div>
      </div>
      <div className="col-6">
          <div className="form-group">
              <label for="email">Enter Phone Mail</label>
              <input type="email" className="form-control" id="email"  placeholder="Enter mail" />
          </div>
      </div>

      </div>
      <button type="submit" className="btn btn-primary" onClick={bookTicket}>Book Ticket</button>
    </div>
    
  )
}

const Portel = ()=>{
  const [addTicket,setTicket] = useState(false);
  const [book,setBook] = useState(false);
  const [bookings,setBookings] = useState([]);
  
  const addTheater = async()=>{
        let tname = document.getElementById('tname').value
        let mname = document.getElementById('movie').value
        let time = document.getElementById('stime').value

        let data = {
          "name":tname,
          "movie":mname,
          "date":document.getElementById('date').value,
          "shows":{"time":{"stime":time,"available":100}}
        }
        let res = await fetch("https://movie-bookingbackend.herokuapp.com/add",{
          method:"POST",
          body: JSON.stringify(data),
          headers:{"Content-Type":"application/json"}
        })
        let k = await res.json();
        alert(k.message);

  }
  const getBookings = async()=>{
      let date = document.getElementById('date').value
      let data = {
        "date":date
      }

      let res = await fetch("https://movie-bookingbackend.herokuapp.com/getBookings",{
        method:"POST",
          body: JSON.stringify(data),
          headers:{"Content-Type":"application/json"}
      })
      let k = await res.json();
      alert(k.message);
      //setBook(false);
      setBookings(k.result);
      console.log(k.result);
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col">
          <button type="submit" class="btn btn-primary" onClick={()=>{
              setBook(false)
              setTicket(addTicket=>!addTicket)
          }}>Add Theater</button>
        </div>
        <div className="col">
          <button type="submit" class="btn btn-primary" onClick={()=>{
            setTicket(false);
              setBook(book=>!book)
          }}>Get Bookings</button>
        </div>
      </div>
      {
        addTicket?<div>
            <div className="row">
        <div className="col-12">
        <div class="form-group">
              <label for="tname">Enter Theater</label>
              <input type="text" className="form-control" id="tname"  placeholder="Enter theater" />
              
        </div>
        <div class="form-group">
              <label for="movie">Enter Movie</label>
              <input type="text" className="form-control" id="movie"  placeholder="Enter movie" />
              
        </div>
        <div class="form-group row">
          <label for="date" class="col-2 col-form-label">Date</label>
          
            <input class="form-control" type="date"  id="date" placeholder="yyyy-mm-dd" />
  
    </div>
        <div class="form-group">
            <label for="stime">Select showTime</label>
            <select className="form-control" id="stime">
              <option>11</option>
              <option>15</option>
              <option>18</option>
              <option>21</option>
              
            </select>
         </div>
         <button type="submit" className="btn btn-primary" onClick={addTheater}>Addtheater</button>

          </div></div>
        </div>:null
      }
      {
        book?
       
        <div>
           <div class="form-group row">
          <label for="date" class="col-2 col-form-label">DateToGetBookings</label>
          
            <input class="form-control" type="date"  id="date" placeholder="yyyy-mm-dd" />
  
    </div>
    <button type="submit" className="btn btn-primary" onClick={getBookings}>GetBookings</button>        

        </div>:null
      }
      
      {
        bookings.map((ele,ind)=>{
        return (  <div className="card" style={{"width":"22rem"}}>
            <div className="card-body">
        <h5 className="card-title">Customer:{ele.customer}</h5>
        <h4>Theater:{ele.name}</h4>
        <h4>Movie{ele.movie}</h4>
        <h5>Date:{ele['date']}</h5>
        <h5>seats:{ele.seats}</h5>
        <h5>Show Time : {ele.time}</h5>
        
            </div>
          </div>
        )
         
         

        })

        }
      
    </div>
  )
}

const LoginPortel = ()=>{
  const {push} = useHistory();
const [shows,setShows] = useState([]);

  const getShows = async()=>{
    let name = document.getElementById('movie').value
    let date = document.getElementById('date').value
    alert(date);
    let data = {
      "movie":name,
      "date":date
    }
    let res = await fetch("https://movie-bookingbackend.herokuapp.com/getShows",{
    method:"POST",
    body: JSON.stringify(data),
    headers:{"Content-Type":"application/json"}
    })
    let k = await res.json();
    
    
    setShows(k);
    console.log(k);
    //console.log(shows);
    
  }
  return(
    <div style={{"marginTop":"20"+'px'}}>
    <div className="row">
      <div className="col-6">
      <div class="form-group">
              <label for="movie">Enter Movie Name</label>
              <input type="text" className="form-control" id="movie"  placeholder="Enter Movie Name" /> 
        </div>

      </div>
      <div className="col-6">
      <div class="form-group row">
          <label for="date" class="col-2 col-form-label">Date</label>
          
            <input class="form-control" type="date"  id="date" placeholder="yyyy-mm-dd" />
  
    </div>
      </div>
    </div>
    <button type="submit" className="btn btn-primary" onClick={getShows}>GetShows</button>
      {
        shows.map((ele,ind)=>{
          
         return ( <div className="card" style={{"width":"28rem"}}>
            <div className="card-body">
        <h5 className="card-title">Theater:{ele.name}</h5>
        <h4>Movie{ele.movie}</h4>
        <h5>Date:{ele['date']}</h5>
        <h5>Available seats:{ele.shows.time.available}</h5>
        <h5>Show Time : {ele.shows.time.stime}</h5>
        <button type="submit" className="btn btn-primary" onClick={()=>{
          myContext.theater=ele.name
          myContext.movie=ele.movie
          myContext.seats=ele.shows.time.available
          myContext.date=ele['date']
          myContext.time = ele.shows.time.stime

          push("/book");

        }}>Book-Ticket</button>
            </div>
          </div>
         )
         

        })
      }

    </div>

  )
}


const Login = ()=>{
  const {push} = useHistory();

  const [role,setRole] = useState([]);

const login = async()=>{

  let data = {
    
    "email":document.getElementById("email").value,
    "password":document.getElementById("password").value,
    
    "role":document.getElementById('role').value
}
let res = await fetch("https://movie-bookingbackend.herokuapp.com/login",{
  method:"POST",
  body: JSON.stringify(data),
  headers:{"Content-Type":"application/json"}
})
let k = await res.json();
console.log(k.message);
  alert(`${k.message}`);
  setRole([data.role])

}

  return (
    <div className="container">
       <div className="row">
        <div className="col-12">
        
        <div class="form-group">
              <label for="email">Enter Email</label>
              <input type="email" className="form-control" id="email"  placeholder="Enter Email" />
              
        </div>
        <div class="form-group">
              <label for="password">Enter Password</label>
              <input type="password" className="form-control" id="password"  placeholder="Enter Password" />
              
        </div>
        <div class="form-group">
            <label for="select1">Select Role</label>
            <select className="form-control" id="role">
              <option>admin</option>
              <option>user</option>
              
            </select>
         </div>
         <button type="submit" className="btn btn-primary" onClick={login}>Sign-In</button>
         {
          role.map((ele,ind)=>{

          return <button type="submit" className="btn btn-primary" onClick={()=>{
            if(ele=="admin"){
            push("/portel")
            }
            else{
              push("/loginportel")
            }

          }}>Go to {ele} portel</button>
         } )
           
         }
      </div>
      </div>
    </div>
  )

}


const Register = ()=>{
  const {push} = useHistory();
const register = async()=>{
  let data = {
    "name":document.getElementById("name").value,
    "email":document.getElementById("email").value,
    "password":document.getElementById("password").value,
    "phone":document.getElementById("phone").value,
    "role":document.getElementById('role').value
}
  let res = await fetch("https://movie-bookingbackend.herokuapp.com/register",{
    method:"POST",
    body: JSON.stringify(data),
    headers:{"Content-Type":"application/json"}
  })
  let k = await res.json();
  alert(`${k.message}`);
}

  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
        <div class="form-group">
              <label for="name">Enter Name</label>
              <input type="text" className="form-control" id="name"  placeholder="Enter name" />
              
        </div>
        <div class="form-group">
              <label for="email">Enter Email</label>
              <input type="email" className="form-control" id="email"  placeholder="Enter Email" />
              
        </div>
        <div class="form-group">
              <label for="password">Enter Password</label>
              <input type="password" className="form-control" id="password"  placeholder="Enter Password" />
              
        </div>
        <div class="form-group">
              <label for="phone">Enter Phone</label>
              <input type="phone" className="form-control" id="phone"  placeholder="Enter Phone" />
              
        </div>
         <div class="form-group">
            <label for="select1">Select Role</label>
            <select className="form-control" id="role">
              <option>admin</option>
              <option>user</option>
              
            </select>
         </div>

         <button type="submit" className="btn btn-primary" onClick={register}>Register</button>
          <br />
          <br />
          <button type="submit" className="btn btn-primary" onClick={()=>{
            push('/login')
          }}>Login</button>
      </div>
      </div>

    </div>
  )
}


const App = ()=>{
 const h = useHistory();
    console.log(h);
    //const historyy = useHistory();
    return(
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="container">
                 
              <center><h1>Welcome To Movie Mazaa</h1></center>
              
              <a className="btn btn-primary" href="/register" role="button">Sign-Up</a>
              <a className="btn btn-primary" href="/login" role="button">Sign-In</a>
            </div>
          </Route>
          <Route path="/register" exact component={Register}>
            <Register />
          </Route>
         <Route path="/login" exact component={Register}>
            <Login />
          </Route>
          <Route path="/portel" exact component={Register}>
            <Portel />
          </Route>
          <Route path="/loginportel" exact component={Register}>
            <LoginPortel />
          </Route>
          <Route path="/book" exact component={LoginPortel}>
           
            <Bookticket />
          </Route>
        </Switch>
      </Router>
    )
     
}

export default App;
