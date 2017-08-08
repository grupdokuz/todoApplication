Rails.application.routes.draw do
  resources :items
  resources :todos
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope '/api' do
        resources :todos do
	 resources :items 
	end
        resources :hello_world
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
