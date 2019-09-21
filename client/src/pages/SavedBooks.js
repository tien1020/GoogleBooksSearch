import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import { List, ListItem } from "../components/List";


class SavedBooks extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <h1>(React) Google Books Search</h1>
              <h2>Search for and Save Books of Interest.</h2>
             
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <div className="card">
            
              <h1>Saved Books</h1>
              {/* <p>
              Title: {this.state.book.title} </p>
              <p>Author: {this.state.book.author}</p>
                <p>{this.state.book.synopsis}
              </p> */}
              {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                       <p> {book.title} </p>
                       <p> Written by {book.author} </p>
                      </strong>
                    </Link>
                    <ViewBtn
                      onClick={() => this.viewBook(book._id)}
                  />
                    <DeleteBtn onClick={() => this.savedBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
          </Col>
        </Row>
  
      </Container>
    );
  }
}

export default SavedBooks;
