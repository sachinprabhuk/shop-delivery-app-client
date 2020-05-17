import React, { useState } from "react";
import * as firebase from 'firebase'
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";
import { db } from "../../firebase";


export const Home = withStdBottomNav(withStdTopNav(() => {
    
    const [userdoc,setDoc] = useState("");
    const [loading,setLoading] = useState(true);
    // const []

        
    var email=firebase.auth().currentUser.email;
    var items ={};
    var allitems = [];
    var allitemdata ={};
    const fetchData = async() => {
        await db.collection("Users").where("email","==",email).get().then((snapshot)=>{
            snapshot.forEach((snap)=>{
                setDoc(snap.id);
                return;     
            }) 
        }).then(()=>{
            return db.collection("Users").doc(userdoc).collection("ML").doc("Items").get()
        }).then((snapshot)=>{
            items = snapshot.data();
            var itemkeys =Object.keys(items);
            return db.collection("Items").where(firebase.firestore.FieldPath.documentId(), "in", itemkeys).get(); 
        
        }).then((snapshot)=>{
            snapshot.forEach((snaps)=>{
                allitems.push(snaps.id)
                allitemdata[snaps.id]= snaps.data();
            })
            setLoading(false);
        }).catch((err)=>{
            
        }) 
        
        if(!loading)
            document.getElementById("demo").innerHTML =JSON.stringify(allitemdata);
    }
    fetchData();
    return (
        <Container>
            <p id="demo">Loading...</p>
        </Container>
    );
}));
