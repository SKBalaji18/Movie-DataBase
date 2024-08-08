import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onPrevPage = () => {
    const {apiCall} = this.props
    this.setState(
      prev => {
        if (prev.pageNo > 1) {
          return {
            pageNo: prev.pageNo - 1,
          }
        }
        return prev
      },
      () => {
        const {pageNo} = this.state
        apiCall(pageNo)
      },
    )
  }

  onNextPage = () => {
    const {apiCall, totalPages} = this.props
    this.setState(
      prev => {
        if (prev.pageNo < totalPages) {
          return {
            pageNo: prev.pageNo + 1,
          }
        }
        return prev
      },
      () => {
        const {pageNo} = this.state
        apiCall(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="pagination-container">
        <button type="button" className="control-btn" onClick={this.onPrevPage}>
          Prev
        </button>
        <p className="page-no">{pageNo}</p>
        <button type="button" className="control-btn" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
