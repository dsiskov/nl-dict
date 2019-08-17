import React, { Component } from "react";
import axios from "axios";
import * as textHelpers from "../utils/textHelpers";
import _ from "lodash";
import InputWithOptions from "../atoms/input-with-options/index";
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
      <div>
        <div className="form-inline">
          <div className="input-group input-group-sm ml-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Search:</span>
            </div>
            <InputWithOptions
              handleOnFocus={this.onSearchFocus}
              handleOnChange={this.onSearch}
              term={this.state.search}
              suggestionCount={5}
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
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.translationContent }}
        />
      </div>
    );
  }
}
