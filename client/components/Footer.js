import Link from 'next/link';

export default () => (
  <div className="footerDiv">
    <Link href="/about"><p>About</p></Link>
      <p>Please dont contact us</p>
      <img src="https://preview.ibb.co/m6wuXc/mat.jpg" alt="mat" border="0" width={100}/>
    <style jsx>
      {`
        .footerDiv {
            float: bottom;
            text-align: center;
            height: calc(100% - 60px);
        }
      `}
    </style>
  </div>
);
