class WelcomeController < ApplicationController
  def index
    # Pass along recent terms
    @terms = Term.all.order(created_at: :desc).limit(25)
  end
end
