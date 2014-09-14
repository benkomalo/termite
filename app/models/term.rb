class Term < ActiveRecord::Base
  validates :term,
    presence: true,
    uniqueness: { case_sensitive: false }
  validates :definition,
    presence: true
end
