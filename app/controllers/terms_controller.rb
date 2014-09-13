class TermsController < ApplicationController
  def new
  end

  def index
    @terms = Term.all
  end

  def show
    @term = Term.find(params[:id])
  end

  def create
    # TODO: handle validation
    # TODO: handle dupe entries
    @article = Term.new(term_params)

    if @article.save
      redirect_to @article
    else
      redirect_to "#{terms_path}/new?error=1"
    end
  end

  private
  def term_params
    params.require(:term).permit(:term, :definition)
  end
end
