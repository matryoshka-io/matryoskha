import Post from './post'

export default (props) => (

  <div >
   {/* {console.log(props.myPosts)} */}
    {
       props.myPosts.map((post, i) => {
         
          <Post {...post} />
            // <div className="Post">
            //   <Post />
            // <div/>
         
    })

    }
    <style jsx>{`
      .item {
        padding: 10px 29px;
      }
      .form {
        padding: 15px 0;
      }
      .loading {
        font-size: 13px;
      }
      .comments {
        padding: 10px 0 20px;
      }
      @media (max-width: 750px) {
        .item {
          padding: 8px 0px;
        }
      }
    `}</style>
  </div>
)