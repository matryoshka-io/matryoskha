import Link from 'next/link';

export default () => (
  <div className="footerDiv">
    <img src="/static/mat.png" alt="mat" border="0" width={150} />
    <div>Please dont contact us</div>
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
