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
    books: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc


  componentDidMount() {
    this.loadBooks();

  }
  loadBooks = () => {
    API.getBooks()
      .then(res =>
    {
          this.setState ({ books: res.data })
          console.log(res.data)

    }
        
        )

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
          <Col size="md-12">
            <Jumbotron>
              <h1>Save Books</h1>
            </Jumbotron>
            <div className="card">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book.id}>
                      {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> */}
                      <Link to={"/books/" + book._id}>
                        <strong>
                          <p>{book.title} </p>
                          <p>Written by {book.authors}</p>
                        </strong>
                        <p>{book.description}</p>
                      </Link>

                      <a href={book.previewLink} className="btn btn-primary">Preview books</a>

                      <DeleteBtn onClick={() => this.deleteBook(book._id)} ></DeleteBtn>
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
