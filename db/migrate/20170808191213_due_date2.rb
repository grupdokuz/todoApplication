class DueDate2 < ActiveRecord::Migration[5.0]
  def change
        add_column :todos, :due_date, :datetime   
  end
end
