class TermsController < ApplicationController
  def new
  end

  def edit
    @term = Term.find(params[:id])
  end

  def index
    @terms = Term.all
  end

  def show
    @term = Term.find(params[:id])
  end

  def search
    query = params[:query]
    @matches = Term.where("LOWER(term) = LOWER(?)", query).all.to_a
    if @matches.length == 0
      render plain: "No term found for '#{query}'"
    elsif @matches.length == 1
      redirect_to @matches[0]
    else
      # TODO: not actually possible yet because we don't use wildcards
      render plain: "multi #{@matches}"
    end
  end

  def update
    @term = Term.find(params[:id])
    if @term.update(term_params)
      redirect_to @term
    else
      render 'edit'
    end
  end

  def create
    @term = Term.new(term_params)

    if @term.save
      redirect_to @term
    else
      render 'new'
    end
  end

  private
    def term_params
      params.require(:term).permit(:term, :definition)
    end
end
