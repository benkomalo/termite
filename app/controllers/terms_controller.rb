class TermsController < ApplicationController
  def new
  end

  def index
    @terms = Term.all
  end

  def show
    @term = Term.find(params[:id])
  end

  def search
    query = params[:query]
    @matches = Term.where("term LIKE ?", query).all.to_a
    if @matches.length == 0
      render plain: "No term found for '#{query}'"
    elsif @matches.length == 1
      redirect_to @matches[0]
    else
      # TODO: not actually possible yet because we don't use wildcards
      render plain: "multi #{@matches}"
    end
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
