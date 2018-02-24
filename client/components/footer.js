import Link from "next/link"

export default () => (
    <div className="footerDiv">  
        <Link href="#"><p>About</p></Link>
         <p>Please dont contact us</p>
        <Link href="#"><p>Matryoshka-Io copyright</p></Link>
        <style jsx>{`
            .footerDiv {
                float: bottom;
                text-align: center;
                height: calc(100% - 60px);
            }
        `}</style>
    </div>
)