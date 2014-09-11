class TermsController < ApplicationController
  def new
  end

  def show
    @term = Term.find(params[:id])
  end

  def create
    # TODO: handle validation
    # TODO: handle dupe entries
    @article = Term.new(term_params)

    @article.save
    redirect_to @article
  end

  private
  def term_params
    params.require(:term).permit(:term, :definition)
  end
end
