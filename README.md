# IT2805 Project

## Requirements
Install the following applications:
* **VirtualBox**
  * **Windows:** [VirtualBox-5.1.6](http://download.virtualbox.org/virtualbox/5.1.6/VirtualBox-5.1.6-110634-Win.exe)
  * **Fedora:** Follow [this](http://www.tecmint.com/install-virtualbox-on-redhat-centos-fedora/) guide.
* **Vagrant**
  * **Windows:** [Vagrant_1.8.6.msi](https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6.msi)
  * **Fedora:** `dnf install vagrant`


## Verify requirements
> **NOTE:** The Vagrant installer should add `vagrant` to the system path so that is available in terminals. If it is not found, please try logging out and logging back in to your system (this is particularly necessary sometimes for Windows).

To verify that Vagrant is installed correctly, run the following in a terminal (command prompt):
```
vagrant --version
```


## Getting started with Vagrant
### Checking the status of the Vagrant environment
> **NOTE:** You must be in the project directory when you run `vagrant` commands in order for Vagrant to recognize the development environment.

You can list the status of the current environment by running the following in a terminal:
```
vagrant status
```

If you haven't created the server already, you should see something like the output below:
```
Current machine states:

apache-server                  not created (virtualbox)

The environment has not yet been created. Run `vagrant up` to
create the environment. If a machine is not created, only the
default provider will be shown. So if a provider is not listed,
then the machine is not created for that environment.
```


### Creating the server
> **NOTE:** Setting up a Vagrant machine takes a little while so please be patient.

Lets start by creating the `apache-server` machine by running the following:
```
vagrant up
```

After the machine is up, Vagrant should display a message like below and you should be good to go.
```
==> apache-server: Apache server is up and running at http://localhost:8080.
```

You can now access the Apache web server by going to http://localhost:8080


### Stopping, restarting and destroying the server
> **NOTE:**  Vagrant machines are virtual machines and can use a bit of computer resources so you might want to stop or destroy it in between sessions.

If you want to stop, restart or destroy the server you can run one of the following commands:

```
# Stop the server
vagrant halt

# Restart the server
vagrant reload

# Destroy the server
vagrant destroy
```

Now, if you want to start or recreate the server again, simply run the following:
```
vagrant up
```
