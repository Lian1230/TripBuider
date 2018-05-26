import React from 'react';
import { SearchBox } from './styles';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = suggestion => <span>{suggestion.nameAirport}</span>;

const getSuggestions = (airports, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) return [];
  const suggestions = airports.filter(item => {
    if (inputLength === 3 && item.codeIataAirport.toLowerCase() === inputValue) {
      return true;
    }
    const staticBank = item.nameAirport.trim().toLowerCase();
    return staticBank.indexOf(inputValue) > -1;
  })
  if (suggestions.length > 20) return []; // too many result, don't show list.
  return suggestions;
};

// trigger when the one of sugguestion hignlighted or selected
const getSuggestionValue = suggestion => suggestion.nameAirport;

class EditBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    }
    this.onSuggestionsFetchRequested = ({ value }) => {
      const suggestions = getSuggestions(this.props.scope.state.airports, value);
      this.setState({ suggestions });
    }
  }
  render() {
    const { type, scope } = this.props;
    const inputProps = {
      placeholder: type === 'From' ? 'Leaving from' : 'Going to',
      value: scope.state[type],
      onChange: (event, arg) => {
        event.preventDefault();
        scope.setState({ [type]: arg.newValue });
      },
    };
    return (
      <SearchBox>
        {this.props.type}:
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => null}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </SearchBox>
    )
  }
}

export default EditBlock;