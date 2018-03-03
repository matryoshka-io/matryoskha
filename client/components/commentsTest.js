/**
  This adds a comment to a parent in a comment tree
  Tree: the entire comment tree. It is an object wtih keys of id, content and comments.
  parentId: the id of the parent this comment is being added to aa a child
  commentToAdd: the comment. It is an object wtih keys of id, content and comments.
  
  returns a commentTree with the added comment.
*/

function addComment(tree, parentId, commentToAdd) {
  if (tree.id === parentId) {
    tree.comments.push(commentToAdd);
  }
  return tree;
}


/**
  This deletes a comment in a comment tree
  Tree: the entire comment tree. It is an object wtih keys of id, content and comments.
  id: the id of the comment to delete
  
  returns a commentTree with the deleted comment.
*/
function removeComment(tree, id) {
  tree.comments.forEach(comment => {
    if (comment.id === id) {
      //slice it out?
    }
  })
  removeComment()
}


/**
  This edits a comment in a comment tree
  Tree: the entire comment tree. It is an object wtih keys of id, content and comments.
  id: the id of the comment to delete
  content: the content to replace the comment with.
  returns a commentTree with the edited comment.
*/
function editComment(tree, id, content) {

}

module.exports = {
  addComment,
  removeComment,
  editComment
}