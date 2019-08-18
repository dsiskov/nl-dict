import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import * as textHelpers from "../utils/textHelpers";
import InputWithOptions from "../atoms/input-with-options/index";
import DictIcon from "../res/img/Dictionary-icon.png";

const cors_workaround_url = "https://cors-anywhere.herokuapp.com/";
const searchDebounceTimeInMs = 300;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ``,
      searchResults: [],
      selectedSearchResult: {},
      translationContent: "<H1>Nothing to display</H1>"
    };

    this.debouncedOnChange = _.debounce(
      () => this.getSearchResults(this.state.search),
      searchDebounceTimeInMs
    );
  }

  componentDidMount() {
    // nothing special
  }

  async getSearchResults(inputString) {
    if (!!inputString === false) return;

    let url = `https://www.muiswerk.nl/mowb/ajax/getIndex.php`;
    let params = {
      params: {
        word: textHelpers.ascii_to_hex(inputString),
        type: 707265666978,
        time: Date.parse(new Date())
      }
    };

    let response = await axios.get(cors_workaround_url + url, params);
    let parsed = textHelpers.hex_to_ascii(response.data);
    let data = JSON.parse(parsed).map(x => ({
      text: x.tekst,
      type: x.soort,
      baseWord: x.basiswoord,
      key: x.pad
    }));
    if (!!data[0]) {
      await this.getTranslationForSearchResult(data[0].key);
	}
    this.setState({ searchResults: data });
  }

  async getTranslationForSearchResult(selectionKey) {
    let url = `https://www.muiswerk.nl/mowb/ajax/getText.php`;
    let params = {
      params: {
        pad: textHelpers.ascii_to_hex(selectionKey),
        time: Date.parse(new Date())
      }
    };
    let response = await axios.get(cors_workaround_url + url, params);
    let parsed = textHelpers.hex_to_ascii(response.data);
	console.log(textHelpers.parseInnerHTML(parsed));
    this.setState({ translationContent: parsed });
  }

  onSearch = event => {
    this.setState({ search: event.target.value });
    this.debouncedOnChange();
  };

  onSearchFocus = event => {
    this.setState({ search: `` });
  };

  selectedSearchResultChanged = event => {
    let selection = this.state.searchResults.filter(
      x => `${x.text} ${x.type}` === event.target.value
    )[0];
    this.getTranslationForSearchResult(selection.key);
  };

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col
            xs={{ size: 1, offset: 1 }}
            sm={{ size: 1, offset: 1 }}
            lg={{ size: 1, offset: 5 }}
          >
            <img src={DictIcon} alt="App-Icon" height="200px" />
          </Col>
          <Col
            xs={{ size: 1, offset: 1 }}
            sm={{ size: 1, offset: 1 }}
            lg={{ size: 1, offset: 1 }}
          >
            <h1 style={{ lineHeight: "4em" }}>DictR</h1>
          </Col>
        </Row>
        <Row form={true}>
          <Col
            xs={{ size: 1, offset: 1 }}
            sm={{ size: 1, offset: 1 }}
            lg={{ size: 6, offset: 3 }}
          >
            <InputWithOptions
              handleOnFocus={this.onSearchFocus}
              handleOnChange={this.onSearch}
              term={this.state.search}
              suggestionCount={5}
              placeholder={"type your phrase here.."}
              className={"form-control-lg"}
              options={
                !!this.state.searchResults
                  ? [
                      ...new Set(
                        this.state.searchResults.map(searchResult => {
                          return {
                            text: searchResult.text,
                            key: searchResult.key
                          };
                        })
                      )
                    ]
                  : []
              }
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ size: 1, offset: 1 }}
            sm={{ size: 1, offset: 1 }}
            lg={{ size: 6, offset: 3 }}
          >
            <Card style={{ marginTop: "50px" }}>
              <CardBody>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.translationContent
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
