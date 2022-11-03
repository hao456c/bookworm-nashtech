import "./footer.css";

function Footer(){
return(
    <footer className="bg-light px-5 pt-3">
        <div className="logo ">
            <h2>Logo</h2>
        </div>
        <div className="ms-4 pb-3" id="infor">
            <h4 className="my-0">BOOKWORM</h4>
            <p>Address:</p>
            <p>Phone:</p>
        </div>
    </footer>
);
}

export default Footer;