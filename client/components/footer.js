import Link from "next/link"

export default () => (
    <footer className="footer">
        <Link href="#"><p>About</p></Link>
         <p>Please dont contact us</p>
        <Link href="#"><p>Matryoshka-Io copyright</p></Link>
        <style jsx>{
            `.footer {
                display: block;
                float: bottom;
                text-align: center;
            }`
        }</style>
    </footer>
)