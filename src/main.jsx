import React, {useMemo, useState, useEffect, useRef} from "react";
import {createRoot} from "react-dom/client";
import {Search, ShoppingCart, Menu, X, ArrowRight, Plus, Minus, IceCream, Soup, Sandwich, Pizza, Cake, GlassWater, ChevronRight, Sparkles} from "lucide-react";
import "./styles.css";

const categories = [
  ["Momo","https://images.unsplash.com/photo-1625398407796-82650a8c9dd8?auto=format&fit=crop&w=600&q=85"],
  ["Mojito","https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=85"],
  ["Pizza","https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=85"],
  ["Burger","https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=85"],
  ["Cake & Pastry","https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=85"],
  ["Soft-Serves","https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=85"],
  ["Sundaes","https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=85"],
  ["Shakes & Coffee","https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=85"]
];

// price: number used for cart math. label: what's shown on the card.
const products = [
  // Momo
  {id:1,name:"Veg Momo",category:"Momo",price:60,label:"₹60 / ₹70 (Fried)",desc:"Steamed veg dumplings with spicy chutney",img:"https://images.unsplash.com/photo-1625398407796-82650a8c9dd8?auto=format&fit=crop&w=900&q=85"},
  {id:2,name:"Paneer Momo",category:"Momo",price:80,label:"₹80 / ₹90 (Fried)",desc:"Cottage cheese stuffed dumplings, steamed or fried",img:"https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=85"},
  {id:3,name:"Kurkure Momo",category:"Momo",price:120,tag:"Best Seller",desc:"Crispy crunch-coated momos, our signature twist",img:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85"},
  // Mojito
  {id:4,name:"Classic Mojito",category:"Mojito",price:60,desc:"Mint, lime & soda, shaken fresh",img:"https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=85"},
  {id:5,name:"Green Apple Mojito",category:"Mojito",price:70,desc:"Crisp green apple over mint & soda",img:"https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=85"},
  {id:6,name:"Watermelon Mojito",category:"Mojito",price:70,desc:"Chilled watermelon crush with mint & lime",img:"https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=85"},
  // Pizza
  {id:7,name:"Margarita",category:"Pizza",price:100,desc:"Classic tomato, mozzarella & oregano",img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
  {id:8,name:"Veg Pizza",category:"Pizza",price:110,desc:"Loaded with fresh seasonal vegetables",img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"},
  {id:9,name:"Paneer Pizza",category:"Pizza",price:130,desc:"Spiced paneer chunks & bell peppers",img:"https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=85"},
  {id:10,name:"Farm House Pizza",category:"Pizza",price:150,tag:"Best Seller",desc:"Capsicum, onion, tomato, mushroom & cheese",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85"},
  // Burger
  {id:11,name:"Aloo Tikki Burger",category:"Burger",price:60,desc:"Crisp potato patty, chutneys & fresh veggies",img:"https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=85"},
  {id:12,name:"Paneer Tikki Burger",category:"Burger",price:90,desc:"Grilled paneer patty, spicy sauce & lettuce",img:"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=85"},
  {id:13,name:"French Fries",category:"Burger",price:60,desc:"Golden, salted & served hot",img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"},
  // Cake & Pastry
  {id:14,name:"Pineapple Cake",category:"Cake & Pastry",price:300,label:"₹300 (Half Kg) / ₹500 (1 Kg)",desc:"Fresh cream, pineapple chunks",img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85"},
  {id:15,name:"Butterscotch Cake",category:"Cake & Pastry",price:280,label:"₹280 (Half Kg) / ₹480 (1 Kg)",desc:"Crunchy praline & butterscotch cream",img:"https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=900&q=85"},
  {id:16,name:"Choco Chip Cake",category:"Cake & Pastry",price:350,label:"₹350 (Half Kg) / ₹550 (1 Kg)",desc:"Chocolate sponge loaded with choco chips",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"},
  {id:17,name:"Red Velvet Cake",category:"Cake & Pastry",price:350,label:"₹350 (Half Kg) / ₹550 (1 Kg)",tag:"Best Seller",desc:"Classic red velvet, cream cheese frosting",img:"https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=900&q=85"},
  {id:18,name:"Dark Chocolate Dutch Truffle",category:"Cake & Pastry",price:350,label:"₹350 (Half Kg) / ₹550 (1 Kg)",desc:"Rich Belgian dark chocolate truffle",img:"https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=900&q=85"},
  {id:19,name:"Fresh Fruit Cake",category:"Cake & Pastry",price:350,label:"₹350 (Half Kg) / ₹550 (1 Kg)",desc:"Vanilla sponge topped with seasonal fruit",img:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85"},
  // Soft-Serves
  {id:20,name:"Vanilla Soft-Serve",category:"Soft-Serves",price:40,desc:"Classic creamy vanilla swirl",img:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=85"},
  {id:21,name:"Chocolate Soft-Serve",category:"Soft-Serves",price:50,desc:"Rich chocolate swirl cone",img:"https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=900&q=85"},
  {id:22,name:"Twos in One",category:"Soft-Serves",price:50,desc:"Vanilla & chocolate swirled together",img:"https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=900&q=85"},
  // Sundaes
  {id:23,name:"Oreo Flicker",category:"Sundaes",price:80,desc:"Crushed Oreo layered with soft-serve",img:"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85"},
  {id:24,name:"Crunchy Kitkat",category:"Sundaes",price:90,tag:"Best Seller",desc:"Kitkat shards, chocolate sauce & cream",img:"https://images.unsplash.com/photo-1560801619-01e2708d9970?auto=format&fit=crop&w=900&q=85"},
  {id:25,name:"Mango Bliss",category:"Sundaes",price:70,desc:"Fresh mango pulp & soft-serve",img:"https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=900&q=85"},
  {id:26,name:"Berry Brush",category:"Sundaes",price:70,desc:"Mixed berry compote & vanilla swirl",img:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=85"},
  {id:27,name:"Nutty Scotch",category:"Sundaes",price:70,desc:"Butterscotch sauce & roasted nuts",img:"https://images.unsplash.com/photo-1629385697093-51559d493f5b?auto=format&fit=crop&w=900&q=85"},
  {id:28,name:"Caramel Swirl",category:"Sundaes",price:80,desc:"Salted caramel drizzle & soft-serve",img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85"},
  {id:29,name:"Brownie Lover",category:"Sundaes",price:90,tag:"Best Seller",desc:"Warm brownie chunks, chocolate sauce & cream",img:"https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=900&q=85"},
  // Shakes & Coffee
  {id:30,name:"Cold Coffee",category:"Shakes & Coffee",price:80,desc:"Chilled, frothy & bold",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"},
  {id:31,name:"Blueberry Shake",category:"Shakes & Coffee",price:90,desc:"Fresh blueberry blended thick",img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85"},
  {id:32,name:"Banana Shake",category:"Shakes & Coffee",price:90,desc:"Creamy banana, chilled & smooth",img:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85"},
  {id:33,name:"Chocolate Shake",category:"Shakes & Coffee",price:90,desc:"Thick chocolate malt shake",img:"https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=900&q=85"},
  {id:34,name:"Hot Coffee",category:"Shakes & Coffee",price:40,desc:"Freshly brewed, served hot",img:"https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=900&q=85"},
  {id:35,name:"Oreo Shake",category:"Shakes & Coffee",price:100,desc:"Blended Oreo, thick & creamy",img:"https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?auto=format&fit=crop&w=900&q=85"},
  {id:36,name:"Kit Kat Shake",category:"Shakes & Coffee",price:110,tag:"Best Seller",desc:"Loaded with Kit Kat & chocolate cream",img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85"}
];

const catIcon = {
  "Momo":<Soup size={22}/>, "Mojito":<GlassWater size={22}/>, "Pizza":<Pizza size={22}/>,
  "Burger":<Sandwich size={22}/>, "Cake & Pastry":<Cake size={22}/>, "Soft-Serves":<IceCream size={22}/>,
  "Sundaes":<IceCream size={22}/>, "Shakes & Coffee":<GlassWater size={22}/>
};

// Scroll-reveal: elements fade/rise into view once, the only page-wide motion pattern.
function useReveal(){
  useEffect(()=>{
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    },{threshold:0.15});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  });
}

function App(){
  const [category,setCategory]=useState("All");
  const [query,setQuery]=useState("");
  const [cart,setCart]=useState({});
  const [cartOpen,setCartOpen]=useState(false);
  const [mobileNav,setMobileNav]=useState(false);
  const [scrolled,setScrolled]=useState(false);

  useReveal();
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

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
    <header className={`header ${scrolled?"scrolled":""}`}>
      <div className="nav">
        <a className="brand" href="#home">
          <span className="brandIcon"><Sparkles size={22}/></span>
          <span><b>Shri Anant Bhog</b><small>Family Restaurant &amp; Sweets</small></span>
        </a>
        <div className={`links ${mobileNav?"open":""}`}>
          {["Home","Menu","Sweets","About","Visit"].map((x,i)=><a key={x} className={i===0?"active":""} href={"#"+x.toLowerCase()} onClick={()=>setMobileNav(false)}>{x}</a>)}
        </div>
        <div className="actions">
          <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the menu..."/></div>
          <button className="iconBtn cartBtn" onClick={()=>setCartOpen(true)}><ShoppingCart size={22}/>{count>0&&<i>{count}</i>}</button>
          <button className="iconBtn hamburger" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X/>:<Menu/>}</button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="heroOverlay"/>
        <div className="leafDrift l1">🍃</div><div className="leafDrift l2">🍃</div><div className="leafDrift l3">🍃</div>
        <div className="heroContent">
          <div className="eyebrow">Dine · Treat · Repeat</div>
          <h1>Good Food<br/><em>Good Mood</em></h1>
          <p className="tagline">Life is sweeter at Anant Bhog — momos, wood-fired pizza, shakes &amp; fresh cakes, made daily.</p>
          <div className="features">
            <span>Freshly<br/>Made Daily</span><span>Premium<br/>Cakes</span><span>Dine-in &amp;<br/>Takeaway</span>
          </div>
          <button className="primary" onClick={()=>document.getElementById("menu").scrollIntoView({behavior:"smooth"})}>View Menu <ArrowRight size={18}/></button>
        </div>
        <div className="heroFood">
          <div className="floatSlow cakeEmoji">🍰</div>
          <div className="floatFast momoEmoji">🥟</div>
          <div className="floatSlow pizzaEmoji">🍕</div>
        </div>
        <div className="quote">Sweet Moments<br/>Always <span>♥</span></div>
      </section>

      <section className="section categories" id="menu">
        <div className="sectionHead reveal"><div><span>Explore Our Menu</span><h2>What are you craving today?</h2></div></div>
        <div className="categoryRow reveal">
          <button className={`categoryCard ${category==="All"?"selected":""}`} onClick={()=>setCategory("All")}><div className="catAll">ALL</div><b>All Items</b><ChevronRight/></button>
          {categories.map(([name,img])=><button className={`categoryCard ${category===name?"selected":""}`} key={name} onClick={()=>setCategory(name)}><img src={img} loading="lazy"/><b>{name}</b><ChevronRight/></button>)}
        </div>
      </section>

      <section className="section favorites">
        <div className="sectionHead row reveal"><div><span>{category==="All"?"Full Menu":category}</span><h2>{category==="All"?"Everything on offer":`${catIcon[category]?"":""}Our ${category}`}</h2></div>{category!=="All"&&<button className="viewAll" onClick={()=>setCategory("All")}>View Full Menu <ArrowRight size={16}/></button>}</div>
        <div className="productGrid">
          {filtered.map((p,i)=><article className="product reveal" key={p.id} style={{transitionDelay:`${(i%4)*60}ms`}}>
            <div className="productImg">{p.tag&&<label>{p.tag}</label>}<img src={p.img} loading="lazy"/></div>
            <div className="productBody"><h3>{p.name}</h3><p>{p.desc}</p><strong>{p.label||`₹${p.price}`}</strong><button className="add" onClick={()=>add(p)}><ShoppingCart size={16}/> Add to Cart</button></div>
          </article>)}
        </div>
        {!filtered.length&&<div className="empty">No dishes found. Try another search.</div>}
      </section>

      <section className="orderBanner reveal">
        <div className="phoneMock"><div className="phoneTop">ANANT<br/><small>BHOG</small></div><div className="miniFood">🥟 🍕 🍰</div><button>Order Now →</button></div>
        <div><span>Skip The Queue</span><h2>Order Online<br/>in Just a Few Clicks</h2><p>Your favourite momos, pizza &amp; sweets are now<br/>just a tap away.</p><button className="primary" onClick={()=>setCartOpen(true)}>Order Now <ArrowRight size={17}/></button></div>
        <div className="benefits"><div>◉ <b>Easy Online Ordering</b><small>From our website or mobile</small></div><div>◉ <b>Fast Delivery</b><small>Fresh &amp; hot, at your doorstep</small></div><div>◉ <b>Freshly Made Cakes</b><small>Baked in-house, daily</small></div></div>
      </section>
    </main>

    <footer><div className="footerBrand"><Sparkles/><b>Shri Anant Bhog</b><small>Family Restaurant &amp; Sweets</small><p>Good Food • Happier People</p></div><div><h3>Download Our App</h3><p>Get exclusive offers, faster ordering<br/>and a better experience.</p><div className="stores"><button>▶ Google Play</button><button> App Store</button></div></div><div className="footerQuote">Cakes Make<br/>Life Sweeter <span>♥</span></div></footer>

    {count>0&&<button className="mobileCart" onClick={()=>setCartOpen(true)}><ShoppingCart/> <span>{count} {count===1?"Item":"Items"} &nbsp; | &nbsp; ₹{total}</span><b>View Cart <ArrowRight size={17}/></b></button>}

    {cartOpen&&<div className="drawerShade" onClick={()=>setCartOpen(false)}><aside className="cartDrawer" onClick={e=>e.stopPropagation()}>
      <div className="drawerHead"><div><span>YOUR ORDER</span><h2>Cart ({count})</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
      <div className="cartList">{cartItems.length?cartItems.map(p=><div className="cartItem" key={p.id}><img src={p.img}/><div><h3>{p.name}</h3><strong>{p.label||`₹${p.price}`}</strong><div className="qty"><button onClick={()=>change(p.id,-1)}><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={()=>change(p.id,1)}><Plus size={14}/></button></div></div></div>):<div className="empty">Your cart is empty.</div>}</div>
      {count>0&&<div className="checkout"><div><span>Total</span><b>₹{total}</b></div><button className="primary">Proceed to Checkout <ArrowRight size={17}/></button></div>}
    </aside></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
