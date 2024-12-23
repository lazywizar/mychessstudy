describe('ChessBoard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the chessboard', () => {
    cy.get('[data-testid="chessboard"]').should('exist')
  })

  it('should display the initial title', () => {
    cy.contains('MyChessStudy').should('be.visible')
    cy.contains('Your personal chess game analysis platform').should('be.visible')
  })
})
