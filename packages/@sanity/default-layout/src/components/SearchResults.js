import Spinner from 'part:@sanity/components/loading/spinner'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles/SearchResults.css'

class SearchResults extends React.PureComponent {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    // isBleeding: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    ).isRequired,
    query: PropTypes.string.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  element = null

  setElement = ref => {
    this.element = ref
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(prevProps) {
    // NOTE: Disabled because `{block: 'nearest'}` is not supported by all browsers
    // const {isBleeding} = this.props
    //
    // // Scroll active element into view (when user uses arrow keys)
    // if (!isBleeding && this.element && prevProps.activeIndex !== this.props.activeIndex) {
    //   const activeItemElement = this.element.childNodes[this.props.activeIndex]
    //
    //   if (activeItemElement) {
    //     // Use try/catch to avoid crashing unsupported browsers
    //     // eslint-disable-next-line max-depth
    //     try {
    //       activeItemElement.scrollIntoView({block: 'nearest'})
    //     } catch (__) {
    //       // ignore
    //     }
    //   }
    // }
  }

  render() {
    const {activeIndex, isLoading, items, query, renderItem} = this.props
    const noResults = !isLoading && query.length > 0 && items.length === 0

    if (noResults) {
      return (
        <div className={`${styles.root} ${styles.noResults}`}>
          <div>
            Could not find{' '}
            <strong>
              &ldquo;
              {query}
              &rdquo;
            </strong>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className={`${styles.root} ${styles.isLoading}`}>
          <Spinner center message={'Searching…'} />
        </div>
      )
    }

    return (
      <ul className={styles.root} ref={this.setElement}>
        {items.map((item, index) => {
          return (
            <li key={item._id} className={styles.listItem}>
              {renderItem(item, index, activeIndex === index ? styles.activeItem : styles.item)}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default SearchResults
