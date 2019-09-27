import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books:[],
    title: "",
    author: "",
    description: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    if (this.state.title.length !== 0) {
      API.searchBooks(this.state.title)
        .then(res =>
          this.setState({ books: res.data.items, title: "", author: "", description: "" })
        )
        .catch(err => console.log(err));
    }
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    API.getGoogleBooks(this.state.title)
      .then(res => {
        this.setState({ books: res.data.items })
        console.log(this.state.books);
      }
      )
      .catch(err => console.log(err));
  };

  

  handleSaveBooks = info => {
    console.log("book" + info.title);
    API.saveBook({
  
      title: info.title,
      author: info.authors? info.authors.join(", "): info.authors,
      description: info.description,
      image: info.imageLinks.thumbnail ? info.imageLinks.thumbnail: "",
      previewLink: info.previewLink
    })
    .then(res => alert("Saved the Book"))
    .catch(err => console.log(err));

  };

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
                onClick={this.handleSearchSubmit}
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
                    <ListItem key={book.id}>
                      <img src={book.volumeInfo.imageLinks.thumbnail}  alt={book.volumeInfo.title}/> 
                      <Link to={"/books/" + book.id}>
                        <strong>
                          <p>{book.volumeInfo.title} </p>
                          </strong>
                          <p>Written by {book.volumeInfo.authors}</p>
                        
                        <p>{book.volumeInfo.description}</p>
                      </Link>
                    
                       <a href={book.volumeInfo.previewLink} className="btn btn-primary">Preview books</a>
                       <button type="button" class="btn btn-warning" onClick={() => this.handleSaveBooks(book.volumeInfo)}>Save</button>

                      {/* <SaveBtn onClick={() => this.handleSaveBooks(book.volumeInfo)}>Save</SaveBtn> */}
                      
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
