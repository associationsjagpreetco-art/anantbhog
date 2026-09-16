import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {Search, ShoppingCart, Menu, X, ArrowRight, Plus, Minus, Coffee, Utensils, Leaf, Bike, ChevronRight} from "lucide-react";
import "./styles.css";

const categories = [
  ["Burgers","https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=85"],
  ["Pizzas","https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=85"],
  ["Pasta","https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=85"],
  ["Sandwiches","https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=85"],
  ["Snacks","https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=85"],
  ["Beverages","https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=85"]
];

const products = [
  {id:1,name:"Classic Veg Burger",category:"Burgers",price:129,tag:"Best Seller",desc:"Fresh veggies, special sauce, served with crispy fries",img:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85"},
  {id:2,name:"Margherita Pizza",category:"Pizzas",price:199,desc:"Fresh tomato, mozzarella, oregano & herbs",img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
  {id:3,name:"White Sauce Pasta",category:"Pasta",price:169,desc:"Creamy, cheesy & delicious",img:"https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85"},
  {id:4,name:"Iced Coffee",category:"Beverages",price:99,desc:"Chilled coffee, perfect for your mood",img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85"},
  {id:5,name:"Spicy Paneer Burger",category:"Burgers",price:149,desc:"Grilled paneer, spicy sauce, lettuce & tomato",img:"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=85"},
  {id:6,name:"Farmhouse Pizza",category:"Pizzas",price:229,desc:"Capsicum, onion, tomato, mushroom & cheese",img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"},
  {id:7,name:"Red Sauce Pasta",category:"Pasta",price:159,desc:"Classic Italian style pasta",img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85"},
  {id:8,name:"Club Sandwich",category:"Sandwiches",price:149,desc:"Layered with fresh veggies, cheese & special sauce",img:"https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=85"}
];

function App(){
  const [category,setCategory]=useState("All");
  const [query,setQuery]=useState("");
  const [cart,setCart]=useState({});
  const [cartOpen,setCartOpen]=useState(false);
  const [mobileNav,setMobileNav]=useState(false);

  const filtered=useMemo(()=>products.filter(p=>
    (category==="All"||p.category===category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ),[category,query]);

  const add=p=>setCart(c=>({...c,[p.id]:(c[p.id]||0)+1}));
  const change=(id,n)=>setCart(c=>{const x={...c},q=(x[id]||0)+n;if(q<=0)delete x[id];else x[id]=q;return x});
  const cartItems=products.filter(p=>cart[p.id]);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=cartItems.reduce((s,p)=>s+p.price*cart[p.id],0);

  return <div className="app">
    <header className="header">
      <div className="nav">
        <a className="brand" href="#home">
          <span className="brandIcon"><Coffee size={25}/></span>
          <span><b>SHRI ANANT</b><small>CAFE</small></span>
        </a>
        <div className={`links ${mobileNav?"open":""}`}>
          {["Home","Menu","Offers","About Us","Contact"].map((x,i)=><a key={x} className={i===0?"active":""} href={"#"+x.toLowerCase().replace(" ","-")} onClick={()=>setMobileNav(false)}>{x}</a>)}
        </div>
        <div className="actions">
          <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for your favourite food..."/></div>
          <button className="iconBtn cartBtn" onClick={()=>setCartOpen(true)}><ShoppingCart size={22}/>{count>0&&<i>{count}</i>}</button>
          <button className="iconBtn hamburger" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="heroOverlay"/>
        <div className="heroContent">
          <div className="eyebrow">WELCOME TO</div>
          <h1>SHRI ANANT<br/><em>CAFE</em></h1>
          <p className="tagline">Great Food. Good Vibes. Always.</p>
          <div className="features">
            <span><Utensils/>Freshly<br/>Prepared</span><span><Leaf/>Premium<br/>Ingredients</span><span><Bike/>Fast & Safe<br/>Delivery</span>
          </div>
          <button className="primary" onClick={()=>document.getElementById("menu").scrollIntoView({behavior:"smooth"})}>Order Now <ArrowRight size={18}/></button>
        </div>
        <div className="heroFood"><div className="steam">〰<br/>〰</div><div className="coffeeCup">☕</div><div className="burgerEmoji">🍔</div></div>
        <div className="quote">Good Food<br/>Brings People<br/>Together <span>♥</span></div>
      </section>

      <section className="section categories reveal">
        <div className="sectionHead"><div><span>EXPLORE OUR MENU</span><h2>What are you craving today?</h2></div></div>
        <div className="categoryRow">
          <button style={{"--i":0}} className={`categoryCard ${category==="All"?"selected":""}`} onClick={()=>setCategory("All")}><div className="catAll">ALL</div><b>All</b><ChevronRight/></button>
          {categories.map(([name,img])=><button style={{"--i":categories.findIndex(c=>c[0]===name)+1}} className={`categoryCard ${category===name?"selected":""}`} key={name} onClick={()=>setCategory(name)}><img src={img}/><b>{name}</b><ChevronRight/></button>)}
        </div>
      </section>

      <section className="section favorites reveal">
        <div className="sectionHead row"><div><span>POPULAR ITEMS</span><h2>Customers’ Favorites</h2></div><button className="viewAll" onClick={()=>setCategory("All")}>View Full Menu <ArrowRight size={16}/></button></div>
        <div className="productGrid">
          {filtered.map(p=><article style={{"--i":filtered.indexOf(p)}} className="product reveal-item" key={p.id}>
            <div className="productImg">{p.tag&&<label>{p.tag}</label>}<img src={p.img}/></div>
            <div className="productBody"><h3>{p.name}</h3><p>{p.desc}</p><strong>₹{p.price}</strong><button className="add" onClick={()=>add(p)}><ShoppingCart size={16}/> Add to Cart</button></div>
          </article>)}
        </div>
        {!filtered.length&&<div className="empty">No dishes found. Try another search.</div>}
      </section>

      <section className="orderBanner reveal">
        <div className="phoneMock"><div className="phoneTop">SHRI ANANT<br/><small>CAFE</small></div><div className="miniFood">🍔 🍕 🍝</div><button>Order Now →</button></div>
        <div><span>SKIP THE QUEUE</span><h2>Order Online<br/>in Just a Few Clicks</h2><p>Your favorite food is now just a tap away.<br/>Fast. Easy. Convenient.</p><button className="primary" onClick={()=>setCartOpen(true)}>Order Now <ArrowRight size={17}/></button></div>
        <div className="benefits"><div>◉ <b>Easy Online Ordering</b><small>From our website or mobile</small></div><div>◉ <b>Fast Delivery</b><small>Fresh & hot, at your doorstep</small></div><div>◉ <b>Secure Payments</b><small>Multiple payment options</small></div></div>
      </section>
    </main>

    <footer><div className="footerBrand"><Coffee/><b>SHRI ANANT</b><small>CAFE</small><p>Good Food • Happy Moments</p></div><div><h3>Download Our App</h3><p>Get exclusive offers, faster ordering<br/>and a better experience.</p><div className="stores"><button>▶ Google Play</button><button> App Store</button></div></div><div className="footerQuote">Good Food<br/>Brings People<br/>Together ♥</div></footer>

    {count>0&&<button className="mobileCart" onClick={()=>setCartOpen(true)}><ShoppingCart/> <span>{count} {count===1?"Item":"Items"} &nbsp; | &nbsp; ₹{total}</span><b>View Cart <ArrowRight size={17}/></b></button>}

    {cartOpen&&<div className="drawerShade" onClick={()=>setCartOpen(false)}><aside className="cartDrawer" onClick={e=>e.stopPropagation()}>
      <div className="drawerHead"><div><span>YOUR ORDER</span><h2>Cart ({count})</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
      <div className="cartList">{cartItems.length?cartItems.map(p=><div className="cartItem" key={p.id}><img src={p.img}/><div><h3>{p.name}</h3><strong>₹{p.price}</strong><div className="qty"><button onClick={()=>change(p.id,-1)}><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={()=>change(p.id,1)}><Plus size={14}/></button></div></div></div>):<div className="empty">Your cart is empty.</div>}</div>
      {count>0&&<div className="checkout"><div><span>Total</span><b>₹{total}</b></div><button className="primary">Proceed to Checkout <ArrowRight size={17}/></button></div>}
    </aside></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);