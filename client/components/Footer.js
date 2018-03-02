import Link from 'next/link';

export default () => (
  <div className="footerDiv">
      <div>About</div>
      <div>Please dont contact us</div>
      <img src="https://preview.ibb.co/m6wuXc/mat.jpg" alt="mat" border="0" width={150}/>
    <style jsx>
      {`
        .footerDiv {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
        }
      `}
    </style>
  </div>
);
