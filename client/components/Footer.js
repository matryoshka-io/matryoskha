import Link from 'next/link';

export default () => (
  <div className="footerDiv">
    <div>About</div>
    <div>Please dont contact us</div>
    <img src="/static/mat.png" alt="mat" border="0" width={150} />
    <style jsx>
      {`
        .footerDiv {
            width: 100%;
            text-align: center;
        }
      `}
    </style>
  </div>
);
