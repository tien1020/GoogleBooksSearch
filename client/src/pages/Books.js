import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import $ from 'jquery';

class Books extends Component {
  state = {
    books:[],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks() {
    // API.getBooks()
    //   .then(res =>
    //     this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    //   )
    //   .catch(err => console.log(err));
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title)
    .then((results) => {
      //set state of books equal to results.items
      this.setState({
        books: results.items
      })
      console.log(this.state)
    } 
    );
  };
  

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  viewBook = event => {

  }

  savedBook = event => {

  }

  render() {
    return (
      <Container >
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h2>Search for and Save Books of Interest.</h2>
            </Jumbotron>
            <form>
              Book Search
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="(required)"
              />

              <FormBtn
                disabled={!(this.state.title)}
                // onClick={}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Resusts</h1>
            </Jumbotron>
            <div className="card">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <ViewBtn
                        onClick={() => this.viewBook(book._id)}
                      />
                      <SaveBtn onClick={() => this.savedBook(book._id)} />
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

export default Books;
