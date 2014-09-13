class Term < ActiveRecord::Base
  validates :term, presence: true
  validates :definition, presence: true
end
