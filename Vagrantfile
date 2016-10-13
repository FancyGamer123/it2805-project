Vagrant.configure(2) do |config|
  config.vm.define "apache-server" do |box|
    # Use Vagrant box from https://github.com/chef/bento
    box.vm.box = "bento/ubuntu-14.04"

    # Forward port 80 for Apache web server
    box.vm.network :forwarded_port, guest: 80, host: 8080

    # Sync directory to Apache server
    box.vm.synced_folder "Documents/", "/var/www/it2805/"

    # Install Apache with Ansible
    box.vm.provision :ansible_local do |a|
      a.playbook = "setup_apache.yml"
    end

    # Post message when up and running
    box.vm.post_up_message = "Apache server is up and running at http://localhost:8080"

    # Virtualbox settings
    box.vm.provider "virtualbox" do |v|
      v.memory = 512
    end
  end
end
